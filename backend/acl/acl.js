module.exports = ({ apiPath, rules }) => {

  // Check if the last character is a slash
  // otherwise add a slash at the end
  apiPath += apiPath.slice(-1) !== '/' ? '/' : '';

  return function (req, res, next) {
    if (req.url.indexOf(apiPath) === 0) {
      // This is an api route.
      // Get the users role and the entity requested
      // (if not logged in set the role visitorr)
      let userRole = req.session.user ?
        req.session.user.role || 'visitor' : 'visitor';
      // console.log(req.session.user.role, 'SIMON')
      let url = req.url;
      let method = req.method.toLowerCase();
      url += url.slice(-1) !== '/' ? '/' : '';
      let entity = url.split(apiPath).join('').split('/')[0];
      // Loop through our rules
      for (let rule in rules) {
        if (rule === entity) {
          // Found the rule
          // loop through roles
          for (let role in rules[rule]) {
            if (userRole === role) {
              // Found the role
              // now get allowed methods
              let allowed = rules[rule][role]
                .toLowerCase().split(' ');
              if (allowed.includes(method)
                || allowed.includes('all')) {
                // allow user to see this routes
                next();
                return;
              }
            }
          }
        }
      }

      // Do not allow...
      // (don't say forbidden it encourages hackers)
      res.send('No Acesss, sorry buddy');
      return;
    }
  }
}
