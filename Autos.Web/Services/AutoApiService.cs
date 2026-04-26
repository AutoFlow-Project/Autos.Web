using Autos.Web.Models;

namespace Autos.Web.Services
{
    public class AutoApiService
    {
        private readonly HttpClient _httpClient;

        public AutoApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        // obtener autos
        public async Task<List<AutoViewModel>> GetAutosAsync()
        {
            return await _httpClient.GetFromJsonAsync<List<AutoViewModel>>("api/autos");
        }

        // obtener autos por id
        public async Task<AutoViewModel> GetAutoAsync(int id)
        {
            return await _httpClient.GetFromJsonAsync<AutoViewModel>($"api/autos/{id}");
        }

        // crear un nuevo auto
        public async Task<bool> CreateAsync(AutoViewModel auto)
        {
            var response = await _httpClient.PostAsJsonAsync("api/autos", auto);
            return response.IsSuccessStatusCode;
        }

        // actualizar carro por id
        public async Task<bool> UpdateAsync(int id, AutoViewModel auto)
        {
            var response = await _httpClient.PutAsJsonAsync($"api/autos/{id}", auto);
            return response.IsSuccessStatusCode;
        }

        // eliminar carro por id
        public async Task<bool> DeleteAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"api/autos/{id}");
            return response.IsSuccessStatusCode;
        }
    }
}
