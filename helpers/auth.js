module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg', 'Not Authorized');
        res.redirect('/login');
    }

    // authCheck: function(req, res, next){
    //     if(!req.user){
    //         res.redirect('/login');
    //     } else {
    //         // req.flash('error_msg', 'Not Authorized');
    //         // res.redirect('/login');
    //         next();
    //     }
    // }
};