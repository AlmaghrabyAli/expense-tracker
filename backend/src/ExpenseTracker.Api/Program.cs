using System.Text;
using ExpenseTracker.Api.Data;
using ExpenseTracker.Api.Middleware;
using ExpenseTracker.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// ---------- Services (DI container) ----------

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter());
    });
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IReportService, ReportService>(); 

// ---------- CORS ----------

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// ---------- JWT authentication ----------

var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("Jwt:Key is not configured (use dotnet user-secrets).");
if (jwtKey.Length < 32)
    throw new InvalidOperationException("Jwt:Key must be at least 32 characters.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Keep claim names as they are in the token ("sub" stays "sub")
        options.MapInboundClaims = false;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],

            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),

            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero // token expires exactly at ExpiresAt
        };
    });

builder.Services.AddAuthorization();

// ---------- Swagger (with the Authorize button) ----------

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Paste only the token (without the word Bearer)."
    });

    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("Bearer", document)] = []
    });
});

var app = builder.Build();

// ---------- Middleware pipeline (order matters) ----------

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Frontend");

app.UseAuthentication(); // who are you?  (must come BEFORE authorization)
app.UseAuthorization();  // are you allowed?

app.MapControllers();

app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

const string landingHtml = """
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Expense Tracker API</title>
<meta name="description" content="Expense Tracker REST API: an ASP.NET Core Web API hosted on MonsterASP.NET.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='13' fill='%23047857'/%3E%3C/svg%3E">
<style>
:root{--bg:#f8fafc;--card:rgba(255,255,255,.78);--text:#0f172a;--muted:#475569;--line:#e2e8f0;--chip:#f1f5f9;--brand:#047857}
@media (prefers-color-scheme:dark){:root{--bg:#0b1220;--card:rgba(15,23,42,.72);--text:#e2e8f0;--muted:#94a3b8;--line:#1e293b;--chip:#111c33;--brand:#34d399}}
*{box-sizing:border-box}
body{margin:0;min-height:100dvh;display:grid;place-items:center;padding:24px;color:var(--text);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.55;
background:radial-gradient(60rem 40rem at 85% -10%,rgba(79,70,229,.18),transparent 60%),radial-gradient(50rem 36rem at -10% 110%,rgba(5,150,105,.20),transparent 60%),var(--bg)}
.card{width:100%;max-width:760px;padding:40px;border-radius:24px;border:1px solid var(--line);background:var(--card);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 20px 40px -12px rgba(15,23,42,.18)}
.brand{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
h1{margin:0;font-size:clamp(26px,5vw,38px);letter-spacing:-.02em;line-height:1.15}
.sub{margin:6px 0 0;color:var(--muted)}
.status{display:inline-flex;align-items:center;gap:8px;margin-top:20px;padding:6px 14px;border-radius:999px;border:1px solid var(--line);background:var(--chip);font-size:14px;font-weight:600}
.dot{width:9px;height:9px;border-radius:50%;background:#f59e0b}
.status[data-state=ok] .dot{background:#10b981;box-shadow:0 0 0 4px rgba(16,185,129,.2)}
.status[data-state=down] .dot{background:#e11d48}
.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 20px;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;white-space:nowrap;border:1px solid var(--line);color:var(--text);background:var(--chip);transition:transform .15s,box-shadow .15s}
.btn:hover{transform:translateY(-1px);box-shadow:0 8px 16px -8px rgba(15,23,42,.35)}
.btn.primary{color:#fff;border-color:transparent;background:linear-gradient(135deg,#047857,#0f766e)}
h2{margin:36px 0 12px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.row{display:flex;flex-direction:column;gap:2px;padding:12px 14px;border:1px solid var(--line);border-radius:14px;background:var(--chip)}
.row b{font-size:14px}
.row code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;color:var(--brand)}
.note{margin:12px 0 0;font-size:13px;color:var(--muted)}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.tag{padding:4px 12px;border-radius:999px;border:1px solid var(--line);background:var(--chip);font-size:13px;color:var(--muted)}
footer{margin-top:36px;padding-top:20px;border-top:1px solid var(--line);font-size:13px;color:var(--muted)}
@media (prefers-reduced-motion:reduce){.btn{transition:none}}
</style>
</head>
<body>
<main class="card">
  <div class="brand">
    <svg width="56" height="56" viewBox="0 0 48 48" role="img" aria-label="Expense Tracker logo">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#059669"/><stop offset=".45" stop-color="#0D9488"/><stop offset="1" stop-color="#4F46E5"/></linearGradient></defs>
      <rect width="48" height="48" rx="13" fill="url(#g)"/>
      <rect x="13" y="13" width="22" height="5" rx="2.5" fill="#fff"/>
      <rect x="13" y="21.5" width="16" height="5" rx="2.5" fill="#fff" opacity=".92"/>
      <rect x="13" y="30" width="22" height="5" rx="2.5" fill="#fff"/>
      <circle cx="38" cy="15.5" r="3" fill="#FDE68A"/>
    </svg>
    <div>
      <h1>Expense Tracker API</h1>
      <p class="sub">ASP.NET Core Web API hosted on MonsterASP.NET</p>
    </div>
  </div>

  <div id="status" class="status" data-state="loading" role="status" aria-live="polite"><span class="dot"></span><span>Checking status...</span></div>

  <div class="actions">
    <a class="btn primary" href="https://expense-tracker-almaghrabyali.vercel.app">Open live app</a>
    <a class="btn" href="/health">Health check</a>
    <a class="btn" href="https://github.com/AlmaghrabyAli/expense-tracker">GitHub</a>
  </div>

  <h2>Endpoints</h2>
  <div class="grid">
    <div class="row"><b>Authentication</b><code>/api/auth</code></div>
    <div class="row"><b>Categories</b><code>/api/categories</code></div>
    <div class="row"><b>Transactions</b><code>/api/transactions</code></div>
    <div class="row"><b>Reports</b><code>/api/reports</code></div>
    <div class="row"><b>Health</b><code>/health</code></div>
  </div>
  <p class="note">JSON over HTTPS. All endpoints except register, login and health require a Bearer token.</p>

  <h2>Built with</h2>
  <div class="tags">
    <span class="tag">ASP.NET Core</span><span class="tag">.NET 10</span><span class="tag">Entity Framework Core</span><span class="tag">SQL Server</span><span class="tag">JWT</span>
  </div>

  <footer>&copy; 2026 Expense Tracker &middot; Built by Almaghraby Ali</footer>
</main>
<script>
function setState(state, text){var el=document.getElementById('status');el.dataset.state=state;el.lastElementChild.textContent=text;}
fetch('/health',{cache:'no-store'}).then(function(r){return r.ok?r.json():Promise.reject();}).then(function(){setState('ok','Operational');}).catch(function(){setState('down','Unreachable');});
</script>
</body>
</html>
""";
app.MapGet("/", () => Results.Content(landingHtml, "text/html; charset=utf-8"));
app.Run();