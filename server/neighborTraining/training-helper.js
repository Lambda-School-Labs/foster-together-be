const db = require('../../data/db-config.js')

module.exports = {
    add,
    findTrainingByUserId,
    update,
    remove
}

function add(member_id) {
    let newTraining = {
        member_id: member_id,
        module2_q4: false,
        module2_q7: false,
        module2_q8: false,
        training_completed: false,
        training_approved: false
    }
    return db('neighbor_training')
        .insert(newTraining)
        .then(ids => {
            return db('neighbor_training')  //findTrainingByUserId(ids[0])
        })
}

function findTrainingByUserId(member_id) {
    return db('neighbor_training')
        .where('member_id', member_id)
        .first()
}

function update(member_id, changes) {
    return db('neighbor_training')
        .where('member_id', member_id)
        .update(changes)
        .then(() => {
            return findTrainingByUserId(member_id);
        })
}

function remove(member_id) {
    return db('neighbor_training')
        .where('member_id', member_id)
        .del();
}