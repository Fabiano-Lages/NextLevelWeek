import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import './style.css';
import api from '../../services/api';

function TeacherForm() {
const history = useHistory();

    const [nome, setNome] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [assunto, setAssunto] = useState('');
    const [custo, setCusto] = useState('');

    const [schedule, setScheduleItems] = useState([
        { dia_da_semana: 0, de: '', ate: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...schedule,
            {
                dia_da_semana: 0,
                de: '',
                ate: ''
            }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const novo = schedule.map((scheduleItem, index) => {
            if(index === position) {
                return ({ ...scheduleItem, [field]: value });
            }
            return(scheduleItem);
        });

        setScheduleItems(novo);
    }

    function handlecreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            nome,
            avatar,
            whatsapp,
            bio,
            assunto,
            custo: Number(custo.replace(',', '.')),
            schedule
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro');
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas." 
                description="O primeiro passo é preencher este formulário de inscrição"
            />

            <main>
                <form onSubmit={handlecreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            label="Nome completo" 
                            name="nome" 
                            value={nome}
                            onChange={(e) => { setNome(e.target.value) }}
                        />

                        <Input 
                            label="Avatar" 
                            name="avatar" 
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />

                        <Input 
                            label="WhatsApp" 
                            name="whatsapp" 
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />

                        <Textarea 
                            label="Bio" 
                            name="bio" 
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            label="Matéria" 
                            name="assunto" 
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
                            value={assunto}
                            onChange={(e) => { setAssunto(e.target.value) }}
                        />
                        
                        <Input 
                            label="Custo da sua hora por aula" 
                            name="custo" 
                            value={custo}
                            onChange={(e) => { setCusto(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {schedule.map((scheduleItem, ind) => {
                            return(
                                <div key={scheduleItem.dia_da_semana} className="schedule-item">
                                    <Select 
                                        label="Dia da semana" 
                                        name="dia_da_semana" 
                                        onChange={e => setScheduleItemValue(ind, 'dia_da_semana', e.target.value)}
                                        value={scheduleItem.dia_da_semana}
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
                                        label="das" 
                                        type="time" 
                                        name="de" 
                                        onChange={e => setScheduleItemValue(ind, 'de', e.target.value)}
                                        value={scheduleItem.de}
                                    />
                                    <Input 
                                        label="até" 
                                        type="time" 
                                        name="ate" 
                                        onChange={e => setScheduleItemValue(ind, 'ate', e.target.value)}
                                        value={scheduleItem.ate}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;