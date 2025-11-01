class StringUtils {

  public static sentenceCase(string: string): string {
    return string.replace(/\b\w/, (match) => match.toUpperCase());
  }
}

export default StringUtils;
