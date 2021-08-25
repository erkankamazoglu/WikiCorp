using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using WikiCorp.CoreApi.Models.Base;
using WikiCorp.CoreApi.Models.KullaniciVO;
using WikiCorp.CoreApi.Models.ParametreVO;

namespace WikiCorp.CoreApi.Models.IcerikVO
{
    public class Icerik : BaseModel
    {
        [ForeignKey("YazarKullanici")]
        public int YazarKullaniciId { get; set; }

        [ForeignKey("Kategori")]
        public int KategoriId { get; set; }

        public string Baslik { get; set; }

        public string Icerigi { get; set; }  
        
        public DateTime EklenmeTarihi { get; set; }

        public string AnahtarKelimeler { get; set; }

        public int OkuyanSayisi { get; set; }

        public virtual Kullanici YazarKullanici { get; set;}
        
        public virtual Kategori Kategori { get; set;}
    }
}