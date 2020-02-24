import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { isCompositeComponentWithType } from 'react-dom/test-utils';



function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



const Receta = ({ receta }) => {


    //configuraicon del modal de material UI
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const classes = useStyles();


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const {informacion, guardarIdReceta } = useContext(ModalContext);
    
    //muestra y formatea los ingredientes

    const mostrarIngredientes =informacion=>{
        let ingredientes =[]
        for (let i = 1; i < 16; i++) {
          if(informacion[`strIngredient${i}`]){
              ingredientes.push(
              <li>{ informacion[`strIngredient${i}`] } { informacion[`strMeasure${i}`] }</li>
              )
          }
            
        }
        return ingredientes;
    }

    return (
        <div className="col-md-4">
            <div className="card">
                <h2 className="card-header">
                    {receta.strDrink}
                </h2>
                <div className="card-body">
                    <img className="card-img-top" src={receta.strDrinkThumb} alt={receta.strDrink} />
                    <button className="btn btn-success btn-block"
                        onClick={() => {
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                            
                        }}
                        >Ver receta
                    </button>

                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={open}
                        onClose={()=>{
                            handleClose()
                            guardarIdReceta(null)

                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{informacion.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>{informacion.strInstructions}</p>
                            <img  className="img-fluid my-4"
                            src={informacion.strDrinkThumb} alt=""/>
                            <h3>ingredientes y cantiades</h3>
                            <ul>
                                {mostrarIngredientes(informacion)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Receta;
