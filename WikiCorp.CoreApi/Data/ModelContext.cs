using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WikiCorp.CoreApi.Models.IcerikVO;
using WikiCorp.CoreApi.Models.KullaniciVO;
using WikiCorp.CoreApi.Models.ParametreVO;

namespace WikiCorp.CoreApi.Data
{
    public class ModelContext : IdentityDbContext<Kullanici, Rol, int>
    {
        public ModelContext(DbContextOptions<ModelContext> options) : base(options)
        {
            
        }

        public DbSet<Icerik> Icerik { get; set; }
        public DbSet<IcerikPuan> IcerikPuan { get; set; } 
        public DbSet<KullaniciRol> KullaniciRol { get; set; }
        public DbSet<Kategori> Kategori { get; set; } 
    }
}