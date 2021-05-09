using WikiCorp.CoreApi.Models.Base;

namespace WikiCorp.CoreApi.Models.IcerikVO
{
    public class IcerikPuan : BaseModel
    {
        public int IcerikId { get; set; }
        public int KullaniciId { get; set; }
        public int Puan { get; set; }
    }
}