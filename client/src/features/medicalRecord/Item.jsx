import React from "react";
import "./styles.scss";

function Item() {
  return (
    <div className="list-element">
      <div class="card">
        <div class="card-header">Doctor A</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>
              Most of the food you eat is broken down into sugar (also called
              glucose) and released into your bloodstream. When your blood sugar
              goes up, it signals your pancreas to release insulin. Insulin acts
              like a key to let the blood sugar into your body’s cells for use
              as energy.
            </p>
            <footer class="blockquote-footer">
              Date <cite title="Source Title">14/03/2022</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Item;
