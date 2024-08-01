// js files
import { handleSubmit } from "./js/app";

// sass files
import "./styles/form.scss";
import "./styles/color.scss";
import "./styles/index.scss";
import "./styles/layout.scss";
import "./styles/responsive.scss";

document.getElementById("urlForm").addEventListener("submit", handleSubmit);

export { handleSubmit };
