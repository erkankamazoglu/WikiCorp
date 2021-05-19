using AutoMapper;
using WikiCorp.CoreApi.DTO;
using WikiCorp.CoreApi.Models.KullaniciVO;

namespace WikiCorp.CoreApi.Helpers
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<Kullanici, KullaniciGirisDTO>();
            CreateMap<KullaniciGirisDTO, Kullanici>();

            CreateMap<Kullanici, KullaniciKayitDTO>();  
            CreateMap<KullaniciKayitDTO, Kullanici>();         
        }
    }
}