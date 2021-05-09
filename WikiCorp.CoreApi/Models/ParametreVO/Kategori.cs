using System.ComponentModel.DataAnnotations.Schema;
using WikiCorp.CoreApi.Models.Base;

namespace WikiCorp.CoreApi.Models.ParametreVO
{
    public class Kategori : BaseModel
    { 
        [ForeignKey("Rol")]
        public int RolId { get; set; }
        
        public string Adi { get; set; }

        public virtual Rol Rol { get; set; }
    }
}