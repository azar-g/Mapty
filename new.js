const modal = document.querySelector('.modal');
const editType = document.querySelector('.modal__input--type');
const editDistance = document.querySelector('.modal__input--distance');
const editDuration = document.querySelector('.modal__input--duration');
const editCadence = document.querySelector('.modal__input--cadence');
const editElevation = document.querySelector('.modal__input--elevation');

const editButton = document.querySelector('.button__edit');
const deleteAllButton = document.querySelector('.button__delete_all');



///////////////////////////////////////////



class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;
  workout;

  constructor() {
    //   Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);

    editType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    editButton.addEventListener('click', this.workoutEdit.bind(this));

    deleteAllButton.addEventListener(
      'click',
      this.deleteAllWorkouts.bind(this)
    );
  }
}


workoutEdit(e) {
  if (!this.workout) return;
  const element = document.querySelector(`[data-id='${this.workout.id}']`);
  // console.log(element);
  modal.classList.remove('hidden');
  let workout = this.workout;

  modal.addEventListener('submit', () => {
    const positiveInputs = (...values) => values.every(value => value > 0);
    const validInputs = (...values) =>
      values.every(value => Number.isFinite(value));

    if (editType.value === 'running') {
      if (
        //prettier-ignore
        !positiveInputs(+editDistance.value, +editDuration.value, + editCadence.value) ||
        !validInputs(+editDistance.value, +editDuration.value,  +editCadence.value)
      ) {
        this._allValuesClear();
        return alert('Input must be positive numbers');
      }
      workout.distance = +editDistance.value;
      workout.duration = +editDuration.value;
      workout.cadence = +editCadence.value;
    }

    if (editType.value === 'cycling') {
      if (
        //prettier-ignore
        !positiveInputs(+editDistance.value, +editDuration.value) ||
        !validInputs(+editDistance.value, +editDuration.value,  +editElevation.value)
      ) {
        this._allValuesClear();
        return alert('Input must be positive numbers');
      }
      workout.distance = +editDistance.value;
      workout.duration = +editDuration.value;
      workout.elevation = +editElevation.value;
    }

    // element.remove();
    console.log(element);
    this._renderWorkout(workout);
    this._allValuesClear();
    modal.classList.add('hidden');
    this._undefineWorkout();
  });
}

/////////////////////////

_moveToPopup(e) {
  const workoutEl = e.target.closest('.workout');

  if (!workoutEl) return;
  this.workout = this.#workouts.find(
    work => work.id === workoutEl.dataset.id
  );
  console.log(workoutEl);
  console.log(this.workout);

  this.#map.setView(this.workout.coords, this.#mapZoomLevel, {
    animate: true,
    pan: {
      duration: 1,
    },
  });
  // workout.click();
}

/////////////////

_undefineWorkout() {
  this.workout = undefined;
  console.log(this.workout);
}

//////////////////

_toggleElevationField(e) {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  editElevation.closest('.modal__row').classList.toggle('modal__row--hidden');
  editCadence.closest('.modal__row').classList.toggle('modal__row--hidden');
}

////////////////////////////

_allValuesClear() {
  // prettier-ignore
  inputDistance.value = inputDuration.value = inputCadence.value =inputElevation.value ='';
  // prettier-ignore
  editDistance.value = editDuration.value = editCadence.value =editElevation.value ='';
}

/////////////////////////////////

reset() {
  localStorage.removeItem('workouts');
  // location.reload();
}

deleteAllWorkouts(e) {
  e.preventDefault();
  this.reset();
  location.reload();
}

workoutEdit(e) {
  e.preventDefault();
  if (!this.workout) return;

  const element = document.querySelector(`[data-id='${this.workout.id}']`);

  const editworkout = this.#workouts.find(
    workout => workout.id === element.dataset.id
  );
  console.log(editworkout);

  console.log(element);
  modal.classList.remove('hidden');

  console.log(this.#workouts, 'before editing');
  console.log(editworkout);
  console.log(editworkout.distance);
  console.log(editworkout, 'is in editing');

  modal.addEventListener('submit', e => {
    e.preventDefault();
    // const positiveInputs = (...values) => values.every(value => value > 0);
    //prettier-ignore
    // const validInputs = (...values) => values.every(value => Number.isFinite(value));

    if (editType.value === 'running') {
      /* if (
        //prettier-ignore
        !positiveInputs(+editDistance.value, +editDuration.value, + editCadence.value) ||
        !validInputs(+editDistance.value, +editDuration.value,  +editCadence.value)
      ) {
        this._allValuesClear();
        return alert('Input must be positive numbers');
      } */
      editworkout.distance = +editDistance.value;
      console.log(editDistance.value);
      console.log(editDistance.value);
      console.log(editworkout.distance);
      editworkout.duration = +editDuration.value;
      editworkout.cadence = +editCadence.value;
    }

    if (editType.value === 'cycling') {
      /* if (
        //prettier-ignore
        !positiveInputs(+editDistance.value, +editDuration.value) ||
        !validInputs(+editDistance.value, +editDuration.value,  +editElevation.value)
      ) {
        this._allValuesClear();
        return alert('Input must be positive numbers');
      } */
      editworkout.distance = +editDistance.value;
      editworkout.duration = +editDuration.value;
      editworkout.elevation = +editElevation.value;
    }

    console.log('I am hereeeee: - before removing me');
    console.log(element);
    element.remove();
    console.log(element);
    console.log(editworkout.distance);

    console.log(this.#workouts, 'after editing');

    this._renderEditedWorkout(editworkout);

    this._allValuesClear();
    modal.classList.add('hidden');
    this._undefineWorkout();
  });
}