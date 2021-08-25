using System;
using System.Linq; 
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WikiCorp.CoreApi.Data;
using WikiCorp.CoreApi.Helpers;
using WikiCorp.CoreApi.Models.IcerikVO;

namespace WikiCorp.CoreApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("Api/[controller]")]
    public class IcerikController : ControllerBase
    { 
        private readonly ModelContext _context;
        public IcerikController(ModelContext context)
        { 
            _context = context;
        }

        [HttpGet("IcerikleriGetir")] 
        public async Task<IActionResult> IcerikleriGetir()
        { 
            int userId = JwtHelper.GetUserIdFromToken(HttpContext.User); 
            var kullaniciRolIds = await _context.KullaniciRol.Where(i => i.KullaniciId == userId).Select(i => i.RolId).ToListAsync();
            var kategoriIds = await _context.Kategori.Where(i => kullaniciRolIds.Contains(i.RolId) || kullaniciRolIds.Contains(1)).Select(i => i.Id).ToListAsync(); 

            var models = await _context
            .Icerik 
            .Where(i => kategoriIds.Contains(i.KategoriId))
            .ToListAsync();
            return Ok(models);
        } 

        [HttpGet("IcerikGetir/{id}")] 
        public async Task<IActionResult> IcerikGetir(int id)
        {
            var model = await _context.Icerik.FirstAsync(i => i.Id == id); 
            if(model != null)
                return Ok(model);
            else
                return NotFound();
        }
 
        [HttpPost("IcerikKaydet")]
        public async Task<IActionResult> IcerikKaydet(Icerik entity) 
        {
            entity.EklenmeTarihi = DateTime.Now;
            entity.YazarKullaniciId = 1;
            _context.Icerik.Add(entity); 
            await _context.SaveChangesAsync(); 
            return CreatedAtAction(nameof(IcerikGetir), new {id = entity.Id}, entity);
        }

        [HttpPut("IcerikGuncelle/{id}")]
        public async Task<IActionResult> IcerikGuncelle(int id, Icerik entity)
        {
            Console.WriteLine("###########################");
            Console.WriteLine("###########################");
            Console.WriteLine("###########################");
            Console.WriteLine("###########################");
            Console.WriteLine(id);
            Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(entity));
            Console.WriteLine("###########################");
            Console.WriteLine("###########################");
            Console.WriteLine("###########################");
            Console.WriteLine("###########################");
            if (id != entity.Id)
            {
                return BadRequest();
            }

            var model = await _context.Icerik.FindAsync(id);

            if(model == null)
            {
                return NotFound();
            }

            model.Baslik = entity.Baslik; 
            model.AnahtarKelimeler = entity.AnahtarKelimeler; 
            model.KategoriId = entity.KategoriId; 
            model.Icerigi = entity.Icerigi; 

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (System.Exception)
            {
                return NotFound();
            } 

            return Ok(entity);
        }
        
        [HttpDelete("IcerikSil/{id}")]
        public async Task<IActionResult> IcerikSil(int id)
        {
            var model = await _context.Icerik.FindAsync(id);

            if(model == null)
            {
                return NotFound();
            }

            _context.Icerik.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("IcerikPuanleriGetir")] 
        public async Task<IActionResult> IcerikPuanleriGetir()
        {
            var models = await _context
            .IcerikPuan 
            .ToListAsync();
            return Ok(models);
        } 

        [HttpGet("IcerikPuanGetir/{id}")] 
        public async Task<IActionResult> IcerikPuanGetir(int id)
        {
            var model = await _context.IcerikPuan.FirstAsync(i => i.Id == id); 
            if(model != null)
                return Ok(model);
            else
                return NotFound();
        }
 
        [HttpPost("IcerikPuanKaydet")]
        public async Task<IActionResult> IcerikPuanKaydet(IcerikPuan entity) 
        {
            _context.IcerikPuan.Add(entity); 
            await _context.SaveChangesAsync(); 
            return CreatedAtAction(nameof(IcerikPuanGetir), new {id = entity.Id}, entity);
        }

        [HttpPut("IcerikPuanGucelle/{id}")]
        public async Task<IActionResult> IcerikPuanGucelle(int id, IcerikPuan entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            var model = await _context.IcerikPuan.FindAsync(id);

            if(model == null)
            {
                return NotFound();
            }

            model.Puan = entity.Puan;  

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (System.Exception)
            {
                return NotFound();
            } 

            return NoContent();
        }
        
        [HttpDelete("IcerikPuanSil/{id}")]
        public async Task<IActionResult> IcerikPuanSil(int id)
        {
            var model = await _context.IcerikPuan.FindAsync(id);

            if(model == null)
            {
                return NotFound();
            }

            _context.IcerikPuan.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}