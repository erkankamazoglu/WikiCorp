using System.Threading.Tasks; 
using Microsoft.AspNetCore.Mvc;
using WikiCorp.CoreApi.Data;  
using Microsoft.EntityFrameworkCore;
using WikiCorp.CoreApi.Models.ParametreVO;
using Microsoft.AspNetCore.Authorization;
using WikiCorp.CoreApi.Models.KullaniciVO;
using WikiCorp.CoreApi.Helpers;
using System.Linq;

namespace WikiCorp.CoreApi.Controllers
{  
    [Authorize]
    [ApiController]
    [Route("Api/[controller]")]
    public class ParametreController : ControllerBase
    {
        private readonly ModelContext _context;
        public ParametreController(ModelContext context)
        { 
            _context = context;
        }

        [HttpGet("RolleriGetir")] 
        public async Task<IActionResult> RolleriGetir()
        {
            var roller = await _context
            .Roles 
            .ToListAsync();
            return Ok(roller);
        } 

        [HttpGet("RolGetir/{id}")] 
        public async Task<IActionResult> RolGetir(int id)
        {
            var rol = await _context.Roles.FirstAsync(i => i.Id == id); 
            if(rol != null)
                return Ok(rol);
            else
                return NotFound();
        }
 
        [HttpPost("RolKaydet")]
        public async Task<IActionResult> RolKaydet(Rol entity) 
        {
            _context.Roles.Add(entity); 
            await _context.SaveChangesAsync(); 
            return CreatedAtAction(nameof(RolGetir), new {id = entity.Id}, entity);
        }

        [HttpPut("RolGucelle/{id}")]
        public async Task<IActionResult> RolGuncelle(int id, Rol entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            var rol = await _context.Roles.FindAsync(id);

            if(rol == null)
            {
                return NotFound();
            }

            rol.Name = entity.Name; 

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
    
        [HttpDelete("RolSil/{id}")]
        public async Task<IActionResult> RolSil(int id)
        {
            var rol = await _context.Roles.FindAsync(id);

            if(rol == null)
            {
                return NotFound();
            }

            _context.Roles.Remove(rol);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("KategorileriGetir")] 
        public async Task<IActionResult> KategorileriGetir()
        {
            int userId = JwtHelper.GetUserIdFromToken(HttpContext.User); 
            var kullaniciRolIds = await _context.KullaniciRol.Where(i => i.KullaniciId == userId).Select(i => i.RolId).ToListAsync(); 

            var models = await _context
            .Kategori 
            .Where(i => kullaniciRolIds.Contains(i.RolId) || kullaniciRolIds.Contains(1))
            .ToListAsync();
            return Ok(models);
        } 

        [HttpGet("KategoriGetir/{id}")] 
        public async Task<IActionResult> KategoriGetir(int id)
        {
            var model = await _context.Kategori.FirstAsync(i => i.Id == id); 
            if(model != null)
                return Ok(model);
            else
                return NotFound();
        }
 
        [HttpPost("KategoriKaydet")]
        public async Task<IActionResult> KategoriKaydet(Kategori entity) 
        {
            _context.Kategori.Add(entity); 
            await _context.SaveChangesAsync(); 
            return CreatedAtAction(nameof(KategoriGetir), new {id = entity.Id}, entity);
        }

        [HttpPut("KategoriGuncelle/{id}")]
        public async Task<IActionResult> KategoriGuncelle(int id, Kategori entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            var model = await _context.Kategori.FindAsync(id);

            if(model == null)
            {
                return NotFound();
            }

            model.Adi = entity.Adi; 
            model.RolId = entity.RolId; 

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
    
        [HttpDelete("KategoriSil/{id}")]
        public async Task<IActionResult> KategoriSil(int id)
        {
            var model = await _context.Kategori.FindAsync(id);

            if(model == null)
            {
                return NotFound();
            }

            _context.Kategori.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("KullaniciRolleriGetir")] 
        public async Task<IActionResult> KullaniciRolleriGetir()
        {
            var models = await _context
            .KullaniciRol 
            .ToListAsync();
            return Ok(models);
        } 

        [HttpGet("KullaniciRolGetir/{id}")] 
        public async Task<IActionResult> KullaniciRolGetir(int id)
        {
            var model = await _context.KullaniciRol.FirstAsync(i => i.Id == id); 
            if(model != null)
                return Ok(model);
            else
                return NotFound();
        }
 
        [HttpPost("KullaniciRolKaydet")]
        public async Task<IActionResult> KullaniciRolKaydet(KullaniciRol entity) 
        {
            _context.KullaniciRol.Add(entity); 
            await _context.SaveChangesAsync(); 
            return CreatedAtAction(nameof(KullaniciRolGetir), new {id = entity.Id}, entity);
        }

        [HttpPut("KullaniciRolGuncelle/{id}")]
        public async Task<IActionResult> KullaniciRolGuncelle(int id, KullaniciRol entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            var model = await _context.KullaniciRol.FindAsync(id);

            if(model == null)
            {
                return NotFound();
            }

            model.KullaniciId = entity.KullaniciId; 
            model.RolId = entity.RolId; 

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
    
        [HttpDelete("KullaniciRolSil/{id}")]
        public async Task<IActionResult> KullaniciRolSil(int id)
        {
            var model = await _context.KullaniciRol.FindAsync(id);

            if(model == null)
            {
                return NotFound();
            }

            _context.KullaniciRol.Remove(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}