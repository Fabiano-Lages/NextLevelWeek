import React, { useState, FormEvent } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './style.css';

function TeacherList() {
    const [assunto, setAssunto] = useState('');
    const [dia_da_semana, setDiaDaSemana] = useState('');
    const [hora, setHora] = useState('');
    const [teachers, setTeachers] = useState([]);

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                assunto,
                dia_da_semana,
                hora
            }
        });

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        label="Matéria" 
                        name="assunto" 
                        value={assunto}
                        onChange={(e) => {setAssunto(e.target.value)}}
                        options={[
                            { value: 'Artes', texto: 'Artes' },
                            { value: 'Biologia', texto: 'Biologia' },
                            { value: 'Ciências', texto: 'Ciências' },
                            { value: 'Educação física', texto: 'Educação física' },
                            { value: 'Filosofia', texto: 'Filosofia' },
                            { value: 'Física', texto: 'Física' },
                            { value: 'Geografia', texto: 'Geografia' },
                            { value: 'História', texto: 'História' },
                            { value: 'Informática', texto: 'Informática' },
                            { value: 'Matemática', texto: 'Matemática' },
                            { value: 'Português', texto: 'Português' },
                            { value: 'Química', texto: 'Química' },
                        ]}
                    />
                    <Select 
                        label="Dia da semana" 
                        name="dia_da_semana" 
                        value={dia_da_semana}
                        onChange={(e) => {setDiaDaSemana(e.target.value)}}
                        options={[
                            { value: '0', texto: 'Domingo' },
                            { value: '1', texto: 'Segunda-feira' },
                            { value: '2', texto: 'Terça-feira' },
                            { value: '3', texto: 'Quarta-feira' },
                            { value: '4', texto: 'Quinta-feira' },
                            { value: '5', texto: 'Sexta-feira' },
                            { value: '6', texto: 'Sábado' }
                        ]}
                    />
                    <Input 
                        type="time" 
                        label="Hora" 
                        name="hora" 
                        value={hora}
                        onChange={(e) => {setHora(e.target.value)}}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher:Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    );
}

export default TeacherList;