let handleMemberJoined = async(MemberId)=>{
    console.log('A new Member has Joined:',MemberId)
    addMemberToDOM(MemberId)

}

let handleMemberLeft = async(MemberId)=>{
    console.log('A member left the chat : ',MemberId);
    removeMemberFromDOM(MemberId);
}





let addMemberToDOM = async(MemberId)=>{
    let {name} = await rtmClient.getUserAttributesByKeys(MemberId,['name'])


    let membersWrapper = document.getElementById('member__list')
    let memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
    <span class="green__icon"></span>
    <p class="member_name">${name}</p>
</div>`

membersWrapper.insertAdjacentHTML('beforeend',memberItem)
}

let removeMemberFromDOM = async(MemberId)=>{
    let memberWrapper =document.getElementById(`member__${MemberId}__wrapper`)
    memberWrapper.remove()
}

let getMembers = async()=>{
    let  members = await channel.getMembers()

    for(let i =0 ; members.length>i;i++){
        addMemberToDOM(members[i])
    }
}



let leaveChannel = async()=>{
    await channel.leave()
    await rtmClient.logout()
}

window.addEventListener('beforeunload',leaveChannel)