import React, { useState } from 'react'
import teamcss from "./Teamhome.module.css"
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, stateChange } from '../Firebase/Firebaseconfig';
import Createteam from './Createteam';
import Profilemenu from '../Profilemenu/Profilemenu';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import swal from 'sweetalert';


const Teamhome = () => {

    const [teamname, setTeamname] = useState("");
    const [teamcategory, setTeamcategory] = useState("");
    const [teammember, setTeammember] = useState("");


    const teamName = (e) => {

        setTeamname(e.target.value)
    }
    const teamCategory = (e) => {
        setTeamcategory(e.target.value)

    }
    const teamMember = (e) => {
        let value = e.target.value;
        if (value.indexOf(" ") !== -1) {
            swal("Space Not allow")
            // let name = value.substring(0, value.length - 2)
            // setTeammember(name)
        } else {
            setTeammember(e.target.value)
        }
    }

    const handleCreateTeam = () => {
        console.log(teamname, teamcategory, teammember);
        const date = new Date().getTime().toString();
        const commaseprate = teammember.split(',');

        stateChange(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const email = user.email

                await setDoc(doc(db, "team", date), {
                    teamname: teamname,
                    teamcategory: teamcategory,
                    teammember: commaseprate,
                    docId: date,
                    userId: uid,
                    adminEmail: email,
                }).then(() => {
                    console.log("Document successfully written!");
                    setTeamname(''); setTeamcategory(''); setTeammember('');
                }).catch((error) => {
                    console.error("Error writing document: ", error);
                });
            } else {
                console.log("User is Signout");
            }
        });
    }
    const editteam = (edname, edcategory, edmember) => {
        console.log("edit team click");
        setTeamname(edname)
        setTeamcategory(edcategory)
        setTeammember(edmember)
    }

    const handleEditSave = async () => {
        const id = localStorage.getItem("docid")
        const commaseprate = teammember.split(',');

        const refForupdate = doc(db, "team", id);
        await updateDoc(refForupdate, {
            teamname: teamname,
            teamcategory: teamcategory,
            teammember: commaseprate
        });
    }

    return (
        <div>
            <div className={`container`}>
                <div className={`row`}>
                    <fieldset className={`${teamcss.mainborder}`}>
                        <legend className={`${teamcss.mainborder}`}>Teams</legend>
                        {/* <section className={`${teamcss.logout} d-flex justify-content-between`}>
                            <div className={`${teamcss.dropdown}`}>
                                <button className={`${teamcss.borderRemove}`} type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <p className={`${teamcss.imgCircle}`} id="profilefirstword">a</p>
                                </button>
                                <div className={`${teamcss.dropdownMenu}`} aria-labelledby="dropdownMenuButton">
                                    <b style={{ fontSize: '20px' }}>Sign in as: </b>
                                    <p className={`${teamcss.info}`} id="profilename"></p>
                                    <p className={`${teamcss.info}`} id="profileemail"></p>
                                    <p className={`${teamcss.info} text-muted`} id="username"></p>
                                    <hr />
                                    <button className={`${teamcss.dropdownItem} ${teamcss.logoutBtn}`} type="button">Logout</button>
                                </div>
                            </div>
                        </section> */}
                        {/* <button onClick="logout()" className="btn btn-danger bi-text-right">LogOut</button> */}

                        <section className={`text-center`}>
                            <Profilemenu />  <h4>Teams you own</h4>
                        </section>
                        <Createteam ed={editteam} />
                        <div className={`d-flex justify-content-end`}>
                            <button type="button" className={`btn btn-dark text-white ${teamcss.shadowRemove} ${teamcss.borderradiusRemove}`} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <i className="bi bi-plus-lg"></i>
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button type="button" onDoubleClick="deleteall()" className={`btn btn-dark text-white ${teamcss.shadowRemove} ${teamcss.borderradiusRemove}`} title="DoubleTap to delete">
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                        <hr />
                        <section className={`text-center`}>
                            <h4>Teams you're part of</h4>
                        </section>
                        <div className={`${teamcss.secondContainer} container`} id="partteamElement">

                        </div>
                    </fieldset>
                </div>
                {/* Button trigger modal */}
                {/* <button type="button" className="btn btn-dark text-white shadow-remove" onClick="createteam()" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Add
    </button> */}
                {/* Modal */}
                <div className={`modal fade`} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className={`modal-dialog modal-dialog-centered`}>
                        <div className={`modal-content ${teamcss.borderradiusRemove}`}>
                            <div className={`modal-header`}>
                                <h5 className={`modal-title`} id="staticBackdropLabel">Modal title</h5>
                                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            </div>
                            <div className={`modal-body`}>
                                <form id="addingmemberform" className={`container`}>
                                    <div className={`${teamcss.formOutline}`}>
                                        <label htmlFor="teamnameinput" className={`form-label`}>Team Name</label>
                                        <input type="text" className={`form-control ${teamcss.shadowRemove} ${teamcss.borderradiusRemove}`} placeholder="Team Name" value={teamname} onChange={teamName} aria-describedby="emailHelp" />
                                    </div>
                                    <input type="hidden" id="hiddeninput" />
                                    <br />
                                    <div className={`${teamcss.formOutline}`}>
                                        <label htmlFor="teamcatogeryinput" className={`form-label`}>Category</label>
                                        <select className={`form-select ${teamcss.shadowRemove} ${teamcss.borderradiusRemove}`} value={teamcategory} onChange={teamCategory} aria-label="Default select example">
                                            <option value="">Category</option>
                                            <option value="Maintainence">Maintainence</option>
                                            <option value="Development">Development</option>
                                            <option value="Project Manager">Project Manager</option>
                                        </select>
                                        {/* <input type="email" className="form-control shadow-remove" placeholder="Category"
                       aria-describedby="emailHelp"> */}
                                    </div>
                                    <br />
                                    <div className={`${teamcss.formOutline}`}>
                                        <label htmlFor="memberemailinput" className={`form-label`}>Member (type email)</label>
                                        <input type="email" className={`form-control ${teamcss.shadowRemove} ${teamcss.borderradiusRemove}`} value={teammember} onChange={teamMember} aria-describedby="emailHelp" />
                                        <p className={`text-muted`}>
                                            Seperated By comas (<b style={{ fontSize: '22px' }}>,</b>)
                                        </p>
                                        {/* <button type="button" onClick="addmember()" className="btn btn-danger rounded-0 mt-3">
                          Add Member
                      </button> */}
                                    </div>
                                </form>
                            </div>
                            <div className={`modal-footer d-flex justify-content-center`}>
                                <button type="button" onClick={handleCreateTeam} className={`btn btn-info text-white ${teamcss.shadowRemove} ${teamcss.borderradiusRemove}`} data-bs-dismiss="modal">
                                    Create
                                </button>
                                <button type="button" onClick={handleEditSave} className={`btn btn-info text-white ${teamcss.shadowRemove} ${teamcss.borderradiusRemove}`} data-bs-dismiss="modal">
                                    Edit
                                </button>
                                <button type="button" className={`btn btn-warning text-white ${teamcss.shadowRemove} ${teamcss.borderradiusRemove}`} data-bs-dismiss="modal">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Teamhome
