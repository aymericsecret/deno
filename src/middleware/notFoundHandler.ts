export default ({ response }: { response: any }) => {
  response.status = 404;
  response.body = {
    status_code: 404,
    msg: "Endpoint not found",
  };
};
