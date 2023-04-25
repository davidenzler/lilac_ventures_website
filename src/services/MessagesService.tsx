export async function getUserInbox(userId: string) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/get_inbox/${userId}`
      );
      return await response.json();
    } catch (error) {
      alert(error);
      return [];
    }
  }

  export async function getUserSentMessages(userId: string) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/get_sentMessages/${userId}`
      );
      return await response.json();
    } catch (error) {
      alert(error);
      return [];
    }
  }

  export async function getUserArchivedMessages(userId: string) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/get_archivedMessages/${userId}`
      );
      return await response.json();
    } catch (error) {
      alert(error);
      return [];
    }
  }

  export async function getUserDeletedMessages(userId: string) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/get_deletedMessages/${userId}`
      );
      return await response.json();
    } catch (error) {
      alert(error);
      return [];
    }
  }