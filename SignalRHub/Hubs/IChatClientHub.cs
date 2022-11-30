using SignalRHub.Model;
using System.Threading.Tasks;

namespace SignalRHub.Hubs
{
    public interface IChatClientHub
    {
        Task EnviarMensagem(ChatData chatData);
    }
}
