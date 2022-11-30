using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRHub.Hubs;
using SignalRHub.Model;
using System.Threading.Tasks;

namespace SignalRHub.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private IChatClientHub _chatClientHub;

        private readonly IHubContext<ChatClientHub> _hubContext;

        public ChatController(IHubContext<ChatClientHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChatData data)
        {
            var _myHub = new ChatClientHub();
            await _hubContext.Clients.All.SendAsync("Chat", data);

            return Ok(new { mensagem = "Operação efetuada com sucesso!" });
        }
    }   
}
