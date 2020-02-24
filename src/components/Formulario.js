import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext';





const Formulario = () => {

    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas,guardarConsultar } = useContext(RecetasContext);
    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    })

    const obtenerDatosReceta = (e) => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form 
        onSubmit={e=>{
            e.preventDefault();
                buscarRecetas(busqueda);
                guardarConsultar(true );
        }}
        className="col-12">
            <fieldset className="text-center">
                <legend>Busca bebidas por categoria o ingrediente</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input type="text"
                        name="nombre"
                        className="form-control"
                        placeholder="Buscar por ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select className="form-control" name="categoria"
                        onChange={obtenerDatosReceta}
                    >

                        <option value="">-- Selecciona Categoría --</option>
                        {categorias.map(categoria => (
                            <option
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input type="submit" value="Bucar bebidas" className="btn btn-primary btn-block" />
                </div>
            </div>
        </form>

    );
}

export default Formulario;