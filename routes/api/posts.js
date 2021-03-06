const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// POST model
const Post = require('../../routes/models/Post');
// Profile model
const Profile = require('../../routes/models/Profile');
// POST validation
const validatePostInput = require('../../validation/post');

// GET reqquest to api/post/test
// desc - tests post route
// access = public
router.get('/test', (req, res) => res.json({ msg: "Posts Works" }));
// GET api/posts
// desc - get posts
// access - public
router.get('/', (req, res) => {
     Post.find()
          .sort({date: -1})
          .then(posts => res.json(posts))
          .catch(err => res.status(404)).json({nopostsfound: 'No posts found' })
});
// GET api/posts/:id
// desc - get posts by ID
// access - public
router.get('/:id', (req, res) => {
     Post.findById(req.params.id)          
          .then(post => res.json(post))
          .catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}))
});
// POST reqquest to api/post
// desc - creates post
// access = private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
     const { errors, isValid } = validatePostInput(req.body);
     // check validation
     if (!isValid) {
          // if any errors send 400 with errors object
          return res.status(400).json(errors);
     }
     const newPost = new Post({
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
     });
     newPost.save().then(post => res.json(post));
});
// DELETE api/posts/:id
// desc - deletes a post
// access - private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
     Profile.findOne({ user: req.user.id })
          .then(profile => {
               Post.findById(req.params.id)
                    .then(post => {
                         // check for post owner
                         if (post.user.toString() !== req.user.id) {
                              return res.status(401).json({ notauthorized: 'User not authorized to delete this post'})
                         }
                         // delete post
                         post.remove().then(() => res.json({ success: true }));
                    })
                    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
          })
});
// POST api/posts/like/:id
// desc - "likes" a user's post
// access - private
router.post('/like/:id', 
     passport.authenticate('jwt', { session: false }),
     (req, res) => {
     Profile.findOne({ user: req.user.id })
          .then(profile => {
               Post.findById(req.params.id)
                    .then(post => {
                         if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                              return res.status(400).json({ alreadyliked: 'User already liked this post'});
                         }
                         // add user ID to the likes array
                         post.likes.unshift({ user: req.user.id });

                         post.save().then(post => res.json(post));
                    })
                    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
          })
});
// POST api/posts/unlike/:id
// desc - "unlikes" a user's post
// access - private
router.post('/unlike/:id',
     passport.authenticate('jwt', { session: false }),
     (req, res) => {
          Profile.findOne({ user: req.user.id })
               .then(profile => {
                    Post.findById(req.params.id)
                         .then(post => {
                              if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                                   return res.status(400).json({ notliked: 'You have not yet liked this post' });
                              }
                              // get remove index
                              const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
                              // splice out of the array
                              post.likes.splice(removeIndex, 1);
                              // save post
                              post.save().then(post => res.json(post));
                         })
                         .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
               })
     });
// route POST api/posts/comment/:id
// desc - add comment to post
// access - private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
     const { errors, isValid } = validatePostInput(req.body);
     // check validation
     if (!isValid) {
          // if any errors send 400 with errors object
          return res.status(400).json(errors);
     }     
     Post.findById(req.params.id)
          .then(post => {
               const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
               }
               // add to comments array
               post.comments.unshift(newComment);
               // save comment to array
               post.save().then(post => res.json(post))
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
})
// route DELETE api/posts/comment/:id/:comment_id
// desc - remove comment from user post
// access - private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
     Post.findById(req.params.id)
          .then(post => {
               // check to see if comment exists
               if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                    return res.status(404).json({ commentnotexists: 'Comment does not exist'});
               }
               // get remove index
               const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);
               // splice comment from array
               post.comments.splice(removeIndex, 1)
               // resave array after deletion
               post.save().then(post => res.json(post))
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
})
module.exports = router;