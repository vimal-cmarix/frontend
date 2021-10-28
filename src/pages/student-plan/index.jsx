import UserService from '@api/services/user';
import { serverRedirect } from '@utils/general';

export default function StudentPlan() {}

StudentPlan.getInitialProps = async ctx => {
  const { token } = ctx.query;
  if (!token) {
    serverRedirect(ctx, `/profile`);
    return;
  }
  try {
    await UserService.confirmStudentsApplication({ token });
    serverRedirect(ctx, `/checkout/premium?billing=monthly`);
  } catch (e) {
    console.error(e);
    serverRedirect(ctx, `/profile?error=${e.message}`);
  }
};
