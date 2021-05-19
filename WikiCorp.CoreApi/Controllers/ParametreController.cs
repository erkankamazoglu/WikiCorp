using System.Threading.Tasks; 
using Microsoft.AspNetCore.Mvc;
using WikiCorp.CoreApi.Data;  
using Microsoft.EntityFrameworkCore;
using WikiCorp.CoreApi.Models.ParametreVO;
using Microsoft.AspNetCore.Authorization;

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
            var kategoriler = await _context
            .Kategori 
            .ToListAsync();
            return Ok(kategoriler);
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

    }
}