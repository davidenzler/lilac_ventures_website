export async function getAccountInformation(userId: string) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8080/account_information/${userId}`
    );
    return await response.json();
  } catch (error) {
    alert(error);
    return [];
  }
}
