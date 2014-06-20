/**
 * VagaryController
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

// CREATE A NEW VAGARY + FLASH    
  'new': function (req, res) {
    res.locals.flash = _.clone(req.session.flash);
    res.view();
    req.session.flash = {};
  },
    
    create: function (req, res, next) {

      // Create User from sign up form > new.ejs
      Vagary.create( req.params.all(), function vagaryCreated (err, vagary) {

        // be there an err log it
        if (err) {
          console.log(err);
          req.session.flash = {
            err: err
          }


        
        // then i can has redirect to sign up
        return res.redirect('/vagary/new/');
      }

      //  res.json(user);
        res.redirect('/vagary/');
        req.session.flash = {};
      });
    },


// VIEW A VAGARY
    view: function (req, res, next) {
      Vagary.findOne(req.param('id'), function foundVagary (err, vagary) {
        if (err) return next(err);
        if (!vagary) return next();
        res.view({
          vagary: vagary
        });
      });
    },

// LIST ALL VAGARY
    index: function (req, res, next) {
      Vagary.find(function foundVagary (err, vagary) {
        if (err) return next(err);
        // pass all of dem user down to list template
        res.view({
          vagary: vagary
        });
      });
    },

// EDIT A VAGARY
    edit: function (req, res, next) {
      Vagary.findOne(req.param('id'), function foundVagary (err, vagary) {
        if (err) return next(err);
        if (!vagary) return next('Vagary doesn\'t exist.');

        res.view({
          vagary: vagary
        });
      });
    },    

    // HANDLES FORM
    update: function (req, res, next) {
      Vagary.update(req.param('id'), req.params.all(), function vagaryUpdated (err) {
        if (err) {
          return res.redirect('/vagary/edit/' + '/wut/' + req.param('id'));
        }

        res.redirect('/vagary/');
      });
    },    


// DELETE A VAGARY
    destroy: function (req, res, next) {
      Vagary.findOne(req.param('id'), function foundVagary (err, vagary) {
        if (err) return next(err);
        if (!vagary) return next('Vagary doesn\'t exist.');

        Vagary.destroy(req.param('id'), function vagaryDestroyed(err) {
          if (err) return next(err);
        });

        res.redirect('/vagary/');

      });
    }





  
};
