export default {
  title: [
    {
      validator: val => (!val || val !== ''),
      message: "The title is reqire."
    },
    {
      validator: val => val.length > 5,
      message: "The title is > 5 chars."
    }
  ]
};
