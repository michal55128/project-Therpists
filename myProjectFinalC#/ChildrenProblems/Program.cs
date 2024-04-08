using DataContext;
using Microsoft.EntityFrameworkCore;
using Repository.Interface;
using Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddServices();
//builder.Services.AddDbContext<IContext, Db>();
builder.Services.AddSingleton<IContext, Db>();



builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000",
                                "http://www.contoso.com")
                                        .AllowAnyHeader()
                                      .AllowAnyMethod();
        });
});
var app = builder.Build();


//protected override void OnModelCreating(ModelBuilder builder)
//{
//    builder.Entity<User>()
//        .HasIndex(u => u.Email)
//        .IsUnique();
//}
// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
