import setupContext from '../../startupHelpers/setupContext';
import routes from '../routes';
import setupCors from '../../startupHelpers/setupCors';
import setupServicesAndSteps from './setupServicesAndSteps';

const setupRouteHandlers = (app, mongoSetup) => {
  routes.forEach(route => {
    const { path, method, steps } = route;

    app[method](path, (res, req) => {
      console.log('routes')
      let isAborted = false;
      res.onAborted(() => {
        console.error('ABORTED!');
        isAborted = true;
      });

      try {
        (async () => {
          let ctx = await setupContext(req, res, path);

          await setupServicesAndSteps(ctx, mongoSetup, steps);

          if (!isAborted) {
            res.cork(() => {
              res.writeStatus(`${ctx.status || 400}`);
              setupCors(res, ctx.request.header.origin);
              if (typeof ctx.headers === 'object') {
                Object.entries(ctx.headers || {}).forEach(([key, value]) => {
                  res.writeHeader(key, value);
                });
              }

              res.end(
                typeof ctx.body === 'object' && ctx.responseType !== 'attachment' ? JSON.stringify(ctx.body) : ctx.body,
              );
            });
          }

          // Wait for promise if we have to
          for (const promiseElement of ctx.waitFor) {
            // eslint-disable-next-line no-await-in-loop
            await promiseElement;
          }

          // Clean up functions
          for (const functionToExecute of ctx.executeAfterFinish) {
            if (functionToExecute.constructor.name === 'AsyncFunction') {
              // eslint-disable-next-line no-await-in-loop
              await functionToExecute();
            } else {
              functionToExecute();
            }
          }

          ctx = null;
        })();
      } catch (e) {
        console.error(e);
      }
    });
  });
};

export default setupRouteHandlers;
