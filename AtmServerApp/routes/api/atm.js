const express = require("express");
const router = express.Router();

// Atm model
const atm = require("../../models/atm");

router.get("/", (req, res) => {
  atm
    .find()
    .sort({ date: -1 })
    .then(atm => res.json(atm))
    .catch(err => res.status(404).json({ noatmsfound: "No atms found" }));
});

router.post("/", (req, res) => {
  Atm.findOne({ id: req.body.id }).then(atm => {
    if (atm) res.json("Atm c с таким id уже есть");
    else {
      const newAtm = new Atm({
        id: req.body.id,
        servicingTime: req.body.servicingTime,
        timeGap: req.body.timeGap,
        count: req.body.count
      });
      console.log(newAtm.id);
      newAtm.save().then(atm => res.json(atm));
    }
  });
});

router.get("/test", (req, res) => {
  console.log(req.body.length);
  // Atm.findOne({ id: req.body.id }).then(atm => {
  //   if (atm) res.json("Atm c с таким id уже есть");
  //   else res.json("Atm c с таким id нету");
  // });
});

// @route   DELETE api/users/:id
// @desc    Delete A User
// @access  Public
router.delete("/:id", (req, res) => {
  Atm.findOne({ id: req.params.id })
    .then(atm => atm.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
// router.delete("/:id", (req, res) => {
//   console.log(req.params.id);
// Atm.findOne({ id: req.params.id }).then(atm => {
//   console.log(atm);
//   atm
//     .remove()
//     .then(() => res.json({ success: true }))
//     .catch(err => res.status(404).json({ postnotfound: "No atm found" }));
// });
// });

// // @route   POST api/posts/like/:id
// // @desc    Like post
// // @access  Private
// router.post(
//   "/like/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Post.findById(req.params.id)
//         .then(post => {
//           if (
//             post.likes.filter(like => like.user.toString() === req.user.id)
//               .length > 0
//           ) {
//             return res
//               .status(400)
//               .json({ alreadyliked: "User already liked this post" });
//           }

//           // Add user id to likes array
//           post.likes.unshift({ user: req.user.id });

//           post.save().then(post => res.json(post));
//         })
//         .catch(err => res.status(404).json({ postnotfound: "No post found" }));
//     });
//   }
// );

// // @route   POST api/posts/unlike/:id
// // @desc    Unlike post
// // @access  Private
// router.post(
//   "/unlike/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Post.findById(req.params.id)
//         .then(post => {
//           if (
//             post.likes.filter(like => like.user.toString() === req.user.id)
//               .length === 0
//           ) {
//             return res
//               .status(400)
//               .json({ notliked: "You have not yet liked this post" });
//           }

//           // Get remove index
//           const removeIndex = post.likes
//             .map(item => item.user.toString())
//             .indexOf(req.user.id);

//           // Splice out of array
//           post.likes.splice(removeIndex, 1);

//           // Save
//           post.save().then(post => res.json(post));
//         })
//         .catch(err => res.status(404).json({ postnotfound: "No post found" }));
//     });
//   }
// );

// // @route   POST api/posts/comment/:id
// // @desc    Add comment to post
// // @access  Private
// router.post(
//   "/comment/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validatePostInput(req.body);

//     // Check Validation
//     if (!isValid) {
//       // If any errors, send 400 with errors object
//       return res.status(400).json(errors);
//     }

//     Post.findById(req.params.id)
//       .then(post => {
//         const newComment = {
//           text: req.body.text,
//           name: req.body.name,
//           avatar: req.body.avatar,
//           user: req.user.id
//         };

//         // Add to comments array
//         post.comments.unshift(newComment);

//         // Save
//         post.save().then(post => res.json(post));
//       })
//       .catch(err => res.status(404).json({ postnotfound: "No post found" }));
//   }
// );

// // @route   DELETE api/posts/comment/:id/:comment_id
// // @desc    Remove comment from post
// // @access  Private
// router.delete(
//   "/comment/:id/:comment_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Post.findById(req.params.id)
//       .then(post => {
//         // Check to see if comment exists
//         if (
//           post.comments.filter(
//             comment => comment._id.toString() === req.params.comment_id
//           ).length === 0
//         ) {
//           return res
//             .status(404)
//             .json({ commentnotexists: "Comment does not exist" });
//         }

//         // Get remove index
//         const removeIndex = post.comments
//           .map(item => item._id.toString())
//           .indexOf(req.params.comment_id);

//         // Splice comment out of array
//         post.comments.splice(removeIndex, 1);

//         post.save().then(post => res.json(post));
//       })
//       .catch(err => res.status(404).json({ postnotfound: "No post found" }));
//   }
// );

module.exports = router;
