using System.ComponentModel.DataAnnotations.Schema;
using WikiCorp.CoreApi.Models.Base;

namespace WikiCorp.CoreApi.Models.IcerikVO
{
    public class IcerikPuan : BaseModel
    {
        [ForeignKey("Icerik")]
        public int IcerikId { get; set; }

        public int KullaniciId { get; set; }
        
        public int Puan { get; set; }

        public virtual Icerik Icerik { get; set; }
    }
}