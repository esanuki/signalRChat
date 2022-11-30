using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using SignalRHub.Model;
using System.Threading.Tasks;

namespace SignalRHub.Hubs
{
    public class ChatClientHub : Hub, IChatClientHub
    {

        public async Task EnviarMensagem(ChatData chatData)
        {
            var connection = Context.ConnectionId;
            await Clients.All.SendAsync("Chat", chatData);
        }

        public override Task OnConnectedAsync()
        {
            var connection = Context.ConnectionId;
            return base.OnConnectedAsync();
        }

        public virtual void HandShake(string token)
        {
            var connection = Context.ConnectionId;
        }
    }
}
