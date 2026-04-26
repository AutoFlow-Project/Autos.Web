using System.ComponentModel.DataAnnotations;

namespace Autos.Web.Models
{
    public class AutoViewModel
    {

        public int Id { get; set; }

        [Required]
        public string Marca { get; set; }

        [Required]
        public string Modelo { get; set; }

        [Required]
        public short Anio { get; set; }

        [Required]
        public string TipoDeAuto { get; set; }

        [Required]
        [Range(1, 8)]
        public byte CantidadDeAsientos { get; set; }

        [Required]
        public string Color { get; set; }

        public bool TieneAireAcondicionado { get; set; }

        [Required]
        public string TipoCombustible { get; set; }

    }
}
