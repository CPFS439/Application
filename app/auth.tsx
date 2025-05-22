import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import {
  signIn,
  confirmSignIn,
  signUp,
  confirmSignUp,
  resetPassword,
  confirmResetPassword,
  getCurrentUser,
} from "aws-amplify/auth";
import { Ionicons } from "@expo/vector-icons";

// Authentication states
const AUTH_STATE = {
  SIGN_IN: "signIn",
  SIGN_UP: "signUp",
  CONFIRM_SIGN_UP: "confirmSignUp",
  FORGOT_PASSWORD: "forgotPassword",
  CONFIRM_RESET_PASSWORD: "confirmResetPassword",
};

export default function AuthScreen() {
  const router = useRouter();
  const [authState, setAuthState] = useState(AUTH_STATE.SIGN_IN);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already signed in
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser();
        if (user) {
          router.replace("/protected/profile");
        }
      } catch (err) {
        // User is not signed in, show auth screen
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  // Handle sign in
  const handleSignIn = async () => {
    if (!username || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signIn({ username, password });
      router.replace("/protected/profile");
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err.message || "Error signing in");
    } finally {
      setLoading(false);
    }
  };

  // Handle sign up
  const handleSignUp = async () => {
    if (!username || !password || !email) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      setAuthState(AUTH_STATE.CONFIRM_SIGN_UP);
    } catch (err) {
      console.error("Sign up error:", err);
      setError(err.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  // Handle confirm sign up
  const handleConfirmSignUp = async () => {
    if (!username || !code) {
      setError("Please enter your username and confirmation code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await confirmSignUp({ username, confirmationCode: code });
      setAuthState(AUTH_STATE.SIGN_IN);
    } catch (err) {
      console.error("Confirm sign up error:", err);
      setError(err.message || "Error confirming sign up");
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!username) {
      setError("Please enter your username");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await resetPassword({ username });
      setAuthState(AUTH_STATE.CONFIRM_RESET_PASSWORD);
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  // Handle confirm reset password
  const handleConfirmResetPassword = async () => {
    if (!username || !code || !newPassword) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await confirmResetPassword({
        username,
        confirmationCode: code,
        newPassword,
      });
      setAuthState(AUTH_STATE.SIGN_IN);
    } catch (err) {
      console.error("Confirm reset password error:", err);
      setError(err.message || "Error confirming password reset");
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#13345c" />
        <Text style={styles.loadingText}>
          Checking authentication status...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/Four_Color_Logo-300x300.webp")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>
            {authState === AUTH_STATE.SIGN_IN && "Sign In"}
            {authState === AUTH_STATE.SIGN_UP && "Create Account"}
            {authState === AUTH_STATE.CONFIRM_SIGN_UP && "Confirm Sign Up"}
            {authState === AUTH_STATE.FORGOT_PASSWORD && "Reset Password"}
            {authState === AUTH_STATE.CONFIRM_RESET_PASSWORD &&
              "Confirm New Password"}
          </Text>

          {/* Error message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Sign In Form */}
          {authState === AUTH_STATE.SIGN_IN && (
            <>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => setAuthState(AUTH_STATE.FORGOT_PASSWORD)}
              >
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => setAuthState(AUTH_STATE.SIGN_UP)}
                >
                  <Text style={styles.switchLinkText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Sign Up Form */}
          {authState === AUTH_STATE.SIGN_UP && (
            <>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    setEmail(text);
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => setAuthState(AUTH_STATE.SIGN_IN)}
                >
                  <Text style={styles.switchLinkText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Confirm Sign Up Form */}
          {authState === AUTH_STATE.CONFIRM_SIGN_UP && (
            <>
              <Text style={styles.infoText}>
                We've sent a confirmation code to your email. Please enter it
                below.
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="key-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmation Code"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleConfirmSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Confirm</Text>
                )}
              </TouchableOpacity>

              <View style={styles.switchContainer}>
                <TouchableOpacity
                  onPress={() => setAuthState(AUTH_STATE.SIGN_IN)}
                >
                  <Text style={styles.switchLinkText}>Back to Sign In</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Forgot Password Form */}
          {authState === AUTH_STATE.FORGOT_PASSWORD && (
            <>
              <Text style={styles.infoText}>
                Enter your email and we'll send you a code to reset your
                password.
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleForgotPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Send Code</Text>
                )}
              </TouchableOpacity>

              <View style={styles.switchContainer}>
                <TouchableOpacity
                  onPress={() => setAuthState(AUTH_STATE.SIGN_IN)}
                >
                  <Text style={styles.switchLinkText}>Back to Sign In</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Confirm Reset Password Form */}
          {authState === AUTH_STATE.CONFIRM_RESET_PASSWORD && (
            <>
              <Text style={styles.infoText}>
                Enter the code sent to your email and your new password.
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="key-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmation Code"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleConfirmResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Reset Password</Text>
                )}
              </TouchableOpacity>

              <View style={styles.switchContainer}>
                <TouchableOpacity
                  onPress={() => setAuthState(AUTH_STATE.SIGN_IN)}
                >
                  <Text style={styles.switchLinkText}>Back to Sign In</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#13345c",
    marginBottom: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#13345c",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    alignItems: "center",
    marginTop: 15,
  },
  linkText: {
    color: "#3498db",
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  switchText: {
    color: "#666",
    fontSize: 14,
  },
  switchLinkText: {
    color: "#13345c",
    fontSize: 14,
    fontWeight: "bold",
  },
  errorText: {
    color: "#d23631",
    marginBottom: 15,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
});
