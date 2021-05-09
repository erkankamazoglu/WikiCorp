using System;
using WikiCorp.CoreApi.Models.Base;

namespace WikiCorp.CoreApi.Models.IcerikVO
{
    public class Icerik : BaseModel
    {
        public int YazarKullaniciId { get; set; }
        public int KategoriId { get; set; }
        public string Baslik { get; set; }
        public string Icerigi { get; set; }
        public DateTime EklenmeTarihi { get; set; }
        public string AnahtarKelimeler { get; set; }
        public int OkuyanSayisi { get; set; }
    }
}