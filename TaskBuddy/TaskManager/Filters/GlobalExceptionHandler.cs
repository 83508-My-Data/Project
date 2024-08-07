using Microsoft.AspNetCore.Mvc.Filters;

namespace TaskManager.Filters
{
    [AttributeUsage(AttributeTargets.All, Inherited = true)]
    public class GlobalExceptionHandler : Attribute, IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            ErrorLggers.ErrorLogger.CurrentErrorLgger.Log(context.Exception.Message);

            context.ExceptionHandled = true;

            //context.Result = < To Do >;
        }
    }
}
