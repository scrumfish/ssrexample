using blog.data;
using blog.objects.Interfaces;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using JavaScriptEngineSwitcher.V8;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using React.AspNet;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddJsEngineSwitcher(options => options.DefaultEngineName = V8JsEngine.EngineName)
  .AddV8();
builder.Services.AddReact();

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();
builder.Services.AddAuthorization(options =>
{
    var policyBuilder = new AuthorizationPolicyBuilder(CookieAuthenticationDefaults.AuthenticationScheme);
    policyBuilder.RequireAuthenticatedUser();
    options.DefaultPolicy = policyBuilder.Build();
    options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("admin"));
});
builder.Services.AddTransient<IUserData, UserData>();
builder.Services.AddTransient<IBlogData, BlogData>();
builder.Services.AddTransient<IImageData, ImageData>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseReact(config =>
{
    config.SetReuseJavaScriptEngines(true)
        .SetLoadBabel(true)
        .SetLoadReact(true)
        .SetReactAppBuildPath("~/dist");
});
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
