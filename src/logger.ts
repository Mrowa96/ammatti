import { blue, red, white, yellow } from "fmt/color";

export function error(message: string) {
  console.log(red(message));
}

export function warn(message: string) {
  console.log(yellow(message));
}

export function info(message: string) {
  console.log(blue(message));
}

export function log(message: string) {
  console.log(white(message));
}
