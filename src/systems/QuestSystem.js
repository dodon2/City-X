export class QuestSystem {
    constructor() {
        this.activeQuests = [];
        this.completedQuests = [];
    }

    addQuest(quest) {
        if (!this.activeQuests.find(q => q.id === quest.id) && !this.completedQuests.includes(quest.id)) {
            this.activeQuests.push(quest);
            console.log('Quest added:', quest.title);
        }
    }

    completeQuest(questId) {
        const index = this.activeQuests.findIndex(q => q.id === questId);
        if (index !== -1) {
            const quest = this.activeQuests.splice(index, 1)[0];
            this.completedQuests.push(questId);
            console.log('Quest completed:', quest.title);
            return quest;
        }
        return null;
    }
}
