import { Controller } from "@hotwired/stimulus";

/* export default class extends Controller {
  connect() {
    this.element.textContent = "Hello World!"
  }
} */
export default class extends Controller {
  connect() {
    console.log("Hello Stimulus ✅");
  }
}
