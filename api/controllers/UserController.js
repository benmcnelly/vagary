/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

	'new': function (req, res) {
    res.locals.flash = _.clone(req.session.flash);
		res.view();
    req.session.flash = {};
	},
    
    create: function (req, res, next) {

    	// Create User from sign up form > new.ejs
    	User.create( req.params.all(), function userCreated (err, user) {

    		// be there an err log it
        if (err) {
          console.log(err);
          req.session.flash = {
            err: err
          }


        
        // then i can has redirect to sign up
    		return res.redirect('/user/new/');
      }

    	//	res.json(user);
        res.redirect('/user/');
        req.session.flash = {};
    	});
    },

    //show controller aka view, display or whatever
    show: function (req, res, next) {
      User.findOne(req.param('id'), function foundUser (err, user) {
        if (err) return next(err);
        if (!user) return next();
        res.view({
          user: user
        });
      });
    },


    //show controller aka view, display or whatever
    index: function (req, res, next) {
      User.find(function foundUsers (err, users) {
        if (err) return next(err);
        // pass all of dem user down to list template
        res.view({
          users: users
        });
      });
    },

    edit: function (req, res, next) {
      User.findOne(req.param('id'), function foundUser (err, user) {
        if (err) return next(err);
        if (!user) return next('User doesn\'t exist.');

        res.view({
          user: user
        });
      });
    },    

    update: function (req, res, next) {
      User.update(req.param('id'), req.params.all(), function userUpdated (err) {
        if (err) {
          return res.redirect('/user/edit/' + req.param('id'));
        }

        res.redirect('/user/');
      });
    },

    destroy: function (req, res, next) {
      User.findOne(req.param('id'), function foundUser (err, user) {
        if (err) return next(err);
        if (!user) return next('User doesn\'t exist.');

        User.destroy(req.param('id'), function userDestroyed(err) {
          if (err) return next(err);
        });

        res.redirect('/user/');

      });
    }





  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to VagaryController)
   */
 // _config: {}

    };    
  


