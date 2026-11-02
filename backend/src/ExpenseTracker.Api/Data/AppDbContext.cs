using ExpenseTracker.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Transaction> Transactions => Set<Transaction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(u => u.FullName).HasMaxLength(100).IsRequired();
            entity.Property(u => u.Email).HasMaxLength(256).IsRequired();
            entity.Property(u => u.PasswordHash).HasMaxLength(100).IsRequired();
            entity.HasIndex(u => u.Email).IsUnique();
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.Property(c => c.Name).HasMaxLength(50).IsRequired();
            entity.Property(c => c.Color).HasMaxLength(7).IsRequired();
            entity.Property(c => c.Type).HasConversion<string>().HasMaxLength(10);

            entity.HasOne(c => c.User)
                  .WithMany(u => u.Categories)
                  .HasForeignKey(c => c.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.Property(t => t.Amount).HasPrecision(18, 2);
            entity.Property(t => t.Note).HasMaxLength(250);
            entity.Property(t => t.Type).HasConversion<string>().HasMaxLength(10);

            entity.HasIndex(t => new { t.UserId, t.Date });

            entity.HasOne(t => t.User)
                  .WithMany(u => u.Transactions)
                  .HasForeignKey(t => t.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(t => t.Category)
                  .WithMany(c => c.Transactions)
                  .HasForeignKey(t => t.CategoryId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // ---------- Seed: التصنيفات الافتراضية (UserId = null) ----------
        var seedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        modelBuilder.Entity<Category>().HasData(
            // Expense
            new Category { Id = 1, Name = "Food", Type = TransactionType.Expense, Color = "#F97316", CreatedAt = seedDate },
            new Category { Id = 2, Name = "Transport", Type = TransactionType.Expense, Color = "#3B82F6", CreatedAt = seedDate },
            new Category { Id = 3, Name = "Bills", Type = TransactionType.Expense, Color = "#EF4444", CreatedAt = seedDate },
            new Category { Id = 4, Name = "Shopping", Type = TransactionType.Expense, Color = "#EC4899", CreatedAt = seedDate },
            new Category { Id = 5, Name = "Health", Type = TransactionType.Expense, Color = "#10B981", CreatedAt = seedDate },
            new Category { Id = 6, Name = "Entertainment", Type = TransactionType.Expense, Color = "#8B5CF6", CreatedAt = seedDate },
            new Category { Id = 7, Name = "Education", Type = TransactionType.Expense, Color = "#06B6D4", CreatedAt = seedDate },
            new Category { Id = 8, Name = "Other", Type = TransactionType.Expense, Color = "#64748B", CreatedAt = seedDate },
            // Income
            new Category { Id = 9, Name = "Salary", Type = TransactionType.Income, Color = "#22C55E", CreatedAt = seedDate },
            new Category { Id = 10, Name = "Freelance", Type = TransactionType.Income, Color = "#14B8A6", CreatedAt = seedDate },
            new Category { Id = 11, Name = "Gift", Type = TransactionType.Income, Color = "#F59E0B", CreatedAt = seedDate },
            new Category { Id = 12, Name = "Other", Type = TransactionType.Income, Color = "#64748B", CreatedAt = seedDate }
        );
    }
}       