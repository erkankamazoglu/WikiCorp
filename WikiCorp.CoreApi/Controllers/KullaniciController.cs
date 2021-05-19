using System;
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using AutoMapper;
using WikiCorp.CoreApi.Models.KullaniciVO;
using WikiCorp.CoreApi.DTO;

namespace WikiCorp.CoreApi.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class KullaniciController : ControllerBase
    {
        private readonly UserManager<Kullanici> _userManager;
        private readonly SignInManager<Kullanici> _signInManager;
        public readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public KullaniciController(UserManager<Kullanici> userManager, SignInManager<Kullanici> signInManager, IConfiguration configuration, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpPost("KayitOl")]
        public async Task<IActionResult> KayitOl(KullaniciKayitDTO model)
        { 
            Kullanici kullanici = _mapper.Map<Kullanici>(model);

            var result = await _userManager.CreateAsync(kullanici, model.Password);

            if(result.Succeeded)
            {
                return StatusCode(201);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("Giris")]
        public async Task<IActionResult> Giris(KullaniciGirisDTO model)
        {
            var kullanici = await _userManager.FindByNameAsync(model.UserName);

            if (kullanici == null) 
                return BadRequest(new {message = "kullanıcı adı bulunamadı"}); 

            var result = await _signInManager.CheckPasswordSignInAsync(kullanici, model.Password, false);

            if(result.Succeeded)
            {
                return Ok(new {
                    token = GenerateJwtToken(kullanici),
                    userName = kullanici.UserName
                });
            }

            return Unauthorized();
        }

        private string GenerateJwtToken(Kullanici kullanici)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:SecretKey").Value);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.NameIdentifier, kullanici.Id.ToString()),
                    new Claim(ClaimTypes.Name, kullanici.UserName),
                }), 
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        } 
    }
}