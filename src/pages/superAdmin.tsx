import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { UserView } from 'src/sections/user/view';
// ----------------------------------------------------------------------
export default function SuperAdminPage() {
  return (
    <>
      <Helmet>
        <title> {`Super Admin - ${CONFIG.appName}`}</title>
      </Helmet>
      <UserView />
    </>
  );
}