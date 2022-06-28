import React, { useEffect, useState } from "react";
import teamcss from "./Teamhome.module.css"
import { db } from "../Firebase/Firebaseconfig"
import { collection, doc, getDocs, getDoc, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, stateChange } from "../Firebase/Firebaseconfig"
import { useHistory } from "react-router";
import Teamhome from "./Teamhome";


const Createteam = (props) => {
    let history = useHistory()
    //! First method (Get Data Once)
    // const docRef = collection(db, "team");
    // useEffect(() => {
    // const getData = async () => {
    // const data = await getDocs(docRef);
    // let abcd = data.docs.map((doc) => ({ ...doc.data() }));
    // setTeamData(data.docs.map((doc) => ({ ...doc.data() })));
    // console.log(data);
    // }
    // }, [])

    //! Second Method (Real Time Update)

    const [teamdata, setTeamData] = useState([]);
    // const [id, setId] = useState([])
    const docId = []
    useEffect(() => {
        const getData = () => {
            stateChange(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    const q = query(collection(db, "team"), where("userId", "==", uid));
                    onSnapshot(q, (querySnapshot) => {
                        const cities = [];
                        querySnapshot.forEach((doc) => {
                            cities.push(doc.data());
                            docId.push(doc.data().docId)
                        });
                        setTeamData(cities);
                    });
                } else {
                    console.log("User Signout");
                    history.push("/login");
                }
            });
        }
        getData();
    }, [])
    const [editid, setEditid] = useState("")

    const handleEdit = async (id) => {
        console.log("Edit click", id);


        localStorage.setItem("docid", id)
        const docRef = doc(db, "team", id)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().teamcategory);
            let edname = docSnap.data().teamname;
            let edcategory = docSnap.data().teamcategory;
            let edmember = docSnap.data().teammember;
            props.ed(edname, edcategory, edmember, id);

        } else {
            console.log("No such document!");
        }

    }

    const allTeam = teamdata.map((data) => {
       return <div key={data.docId} className={`${teamcss.secondContainer} container`}>
            <fieldset className={`${teamcss.myteam} fw-normal text-start`}>
                <div className={`${teamcss.myteamcontent}`}>
                    <p className={`${teamcss.teamname}`}>{data.teamname}</p>
                    <hr />
                    <i> <p className={`${teamcss.member}`}>Members: {data.teammember.map((e, id) => { return <span key={id} style={{ fontSize: 13, margin: 0, fontWeight: 700, }}>{e} &nbsp;</span> })}</p></i>
                    <div className={`d-flex justify-content-between`}>
                        <ul className={`${teamcss.teammember}`}>
                        </ul>
                        <div className={`text-center`}>
                            <i onClick={() => { handleEdit(data.docId); }} data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ cursor: 'pointer' }} className="bi bi-pencil-square pe-2" />
                            <i className="bi bi-gear-fill" style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <hr />
                    <p className={`${teamcss.teammember}`}><b>Category:</b> {data.teamcategory}</p>
                </div>
            </fieldset>
        </div>
    })

    return (
        <>
        {allTeam}
            

        </>

    )
}

export default Createteam;
