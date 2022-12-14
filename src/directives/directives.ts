import tooltipDirective from "./tooltip";

// register all directives
const directives = (app:any) => {
  tooltipDirective(app);
};

export default directives;