import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tag from "../Tags/Tags";
import s from "./DogForm.module.css";
import { getTemperaments } from "../../redux/action";
import axios from 'axios'
import {useHistory} from 'react-router-dom'
const DogsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  const temperamentsList = useSelector((state) => state.temperaments);
  const [name, setName] = useState("");
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [minLife, setMinLife] = useState(0);
  const [maxLife, setMaxLife] = useState(0);
  const [temperaments, setTemperaments] = useState({ id: "", name: "" });
  const [temperamentTags, setTemperamentTags] = useState([]);
  let [validation, setValidation] = useState({name:'', height:'', weight:'', life:'', temp:''})
  const handleAddTag = (event) => {
    event.preventDefault();
    const newTag = temperaments;
    if (!temperamentTags.some((x) => x.id === newTag.id) )
      if(newTag.id !== '0' && newTag.id ) setTemperamentTags([...temperamentTags, newTag]);
  };

  const handleRemoveTag = (tagToRemove) => {
    setTemperamentTags(
      temperamentTags.filter((tag) => tag.name !== tagToRemove)
    );
  };

  const handleTemperamentChange = (event) => {
    const selectedValue = event.target.value;
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;

    setTemperaments({ id: selectedValue, name: selectedText });
  };

  const validationHandler = () => {
    let newValidation = {};
    if(/\d+/.test(name) || !name) newValidation.name="Name can't be empty and can't contain numbers" 
    else newValidation.name="" 
    if(Number(minHeight)> Number(maxHeight) || minHeight==0 || maxHeight==0) newValidation.height="Height can't be 0 and min height cant't be greater or equal than max height" 
    else newValidation.height=""
    if(Number(minWeight)> Number(maxWeight) || minWeight==0 || maxWeight==0)   newValidation.weight="Weight can't be 0 and min weight cant't be greater or equal than max weight" 
    else newValidation.weight="" 
    if(Number(minLife)> Number(maxLife) || minLife==0 || maxLife==0)  newValidation.life="Life can't be 0 and min life cant't be greater or equal than max life" 
    else  newValidation.life="" 
    if(temperamentTags.length===0) newValidation.temp="the dog need have at least one temperament" 
    else newValidation.temp="" 

    setValidation(newValidation)

    return newValidation;
    
  };

  const submitHandler = async(e) =>{
    e.preventDefault()
  let valid = validationHandler()

    if(!valid.name && !valid.height && !valid.weight && !valid.life && !valid.temp) {
     await axios.post('http://localhost:3001/dogs',{name,minHeight,maxHeight,minWeight,maxWeight,minLife,maxLife,temperaments: [...temperamentTags].map(x=> Number(x.id))})
     

     window.alert('Dog created')
       history.push('/home');
    }else{
      window.alert('Please fill the form correctly')
    }
 

  }

  return (
    <form className={s["pet-form"]}>
    <div className={s["form-group"]}>
    <h2>CREATE NEW DOG</h2>
    </div>

      <div className={s["form-group"]}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value) }
        />
      </div>
      <span>{validation.name}</span>
      <div className={s["form-group"]}>
        <label htmlFor="minHeight">Min height:</label>
        <input
          type="number"
          id="minHeight"
          value={minHeight}
          onChange={(event) => setMinHeight(event.target.value)}
        />
      </div>
     
      <div className={s["form-group"]}>
        <label htmlFor="maxHeight">Max height:</label>
        <input
          type="number"
          id="maxHeight"
          value={maxHeight}
          onChange={(event) => setMaxHeight(event.target.value)}
        />
      </div>
      <span>
        {validation.height}
      </span>
      <div className={s["form-group"]}>
        <label htmlFor="minWeight">Min weight:</label>
        <input
          type="number"
          id="minWeight"
          value={minWeight}
          onChange={(event) => setMinWeight(event.target.value)}
        />
      </div>
     
      <div className={s["form-group"]}>
        <label htmlFor="maxWeight">Max weight:</label>
        <input
          type="number"
          id="maxWeight"
          value={maxWeight}
          onChange={(event) => setMaxWeight(event.target.value)}
        />
      </div>
      <span>
        {validation.weight}
      </span>
      <div className={s["form-group"]}>
        <label htmlFor="minLife">Min Life:</label>
        <input
          type="number"
          id="minLife"
          value={minLife}
          onChange={(event) => setMinLife(event.target.value)}
        />
      </div>

      <div className={s["form-group"]}>
        <label htmlFor="maxLife">Max life:</label>
        <input
          type="number"
          id="maxLife"
          value={maxLife}
          onChange={(event) => setMaxLife(event.target.value)}
        />
      </div>

      <span>
        {validation.life}
      </span>
      <div className={s["form-group"]}>
        <label htmlFor="temperaments">Temperaments:</label>
        <div className={s.selectAdd}>
          <select id="temperaments" onChange={handleTemperamentChange}>
            <option key={0} value="">
              Seleccione una opción
            </option>
            {temperamentsList.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
          <button className={s["add-button"]} onClick={handleAddTag}>
            Agregar
          </button>
        </div>
      </div>

      <span>
        {validation.temp}
      </span>
      <div className={s["tags-container"]}>
        {temperamentTags.map((tag) => (
          <Tag key={tag.id} tagName={tag.name} onRemoveTag={handleRemoveTag} />
        ))}
      </div>
      <button type="submit" className={s["submit-button"]} onClick={submitHandler}>
        Enviar
      </button>
    </form>
  );
};

export default DogsForm;
