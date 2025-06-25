declare module "!asyncapi-schema-loader!*.yaml" {
  const content: import("asyncapi-schema-loader").AsyncAPIObject;
  export default content;
}
